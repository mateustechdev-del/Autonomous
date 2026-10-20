import type { Snapshot } from '../types';
import { snapshot } from '../data/demo';
export interface LabAdapter { getSnapshot(signal?: AbortSignal): Promise<Snapshot> }
export class DemoAdapter implements LabAdapter { async getSnapshot(): Promise<Snapshot> { return structuredClone(snapshot); } }
export class FastApiAdapter implements LabAdapter {
 constructor(private readonly baseUrl: string) {}
 async getSnapshot(signal?: AbortSignal): Promise<Snapshot> {
  const response=await fetch(`${this.baseUrl.replace(/\/$/,'')}/api/v1/snapshot`,{signal});
  if(!response.ok) throw new Error(`Backend request failed (${response.status})`);
  const data: unknown=await response.json();
  if(!isSnapshot(data)) throw new Error('Backend returned an incompatible snapshot');
  return data;
 }
}
export function isSnapshot(value: unknown): value is Snapshot {
 if(!value || typeof value!=='object') return false;
 const v=value as Record<string,unknown>;
 // Compare primitive fields recursively with the documented fixture contract.
 function matches(a:unknown,b:unknown):boolean {if(Array.isArray(b)) return Array.isArray(a)&&a.every(x=>matches(x,b[0]));if(b&&typeof b==='object')return !!a&&typeof a==='object'&&Object.entries(b).every(([k,x])=>matches((a as Record<string,unknown>)[k],x));return typeof a===typeof b;}
 return matches(v,snapshot)&&['Idle','Navigating','Inspecting','Completed','Error'].includes((v.robot as Snapshot['robot']).state);
}
export const lab: LabAdapter=new DemoAdapter();
export function downloadDemo() {const link=document.createElement('a');const url=URL.createObjectURL(new Blob([JSON.stringify({source:'DEMO / SIMULATED',...snapshot},null,2)],{type:'application/json'}));link.href=url;link.download='robotics-lab-demo.json';link.click();URL.revokeObjectURL(url);}
