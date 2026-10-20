import { describe,it,expect,vi } from 'vitest';
import { DemoAdapter, FastApiAdapter, isSnapshot } from './lab';
import { snapshot } from '../data/demo';
describe('demo data boundary',()=>{
 it('returns stable independent fixtures',async()=>{const adapter=new DemoAdapter();const a=await adapter.getSnapshot();a.robot.battery=0;expect((await adapter.getSnapshot()).robot.battery).toBe(87);expect(a.missions[0].distance).toBe(42.8);});
 it('validates snapshot fields rather than trusting a successful HTTP response',()=>{expect(isSnapshot(snapshot)).toBe(true);expect(isSnapshot({robot:{}})).toBe(false);expect(isSnapshot({...snapshot,telemetry:[{speed:'invalid'}]})).toBe(false);});
 it('surfaces backend errors',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:false,status:503}));await expect(new FastApiAdapter('http://localhost:8000').getSnapshot()).rejects.toThrow('503');vi.unstubAllGlobals();});
 it('rejects incompatible backend payloads',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>({})}));await expect(new FastApiAdapter('http://localhost:8000').getSnapshot()).rejects.toThrow('incompatible');vi.unstubAllGlobals();});
 it('accepts a compatible backend snapshot',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue({ok:true,json:async()=>snapshot}));await expect(new FastApiAdapter('http://localhost:8000/').getSnapshot()).resolves.toEqual(snapshot);expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/v1/snapshot',{signal:undefined});vi.unstubAllGlobals();});
});
