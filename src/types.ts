export type RobotState = 'Idle' | 'Navigating' | 'Inspecting' | 'Completed' | 'Error';
export interface Robot { id: string; name: string; state: RobotState; battery: number; sensors: { name: string; status: string }[] }
export interface Mission { id: string; name: string; state: RobotState; duration: number; distance: number; obstacles: number; anomalies: number }
export interface Telemetry { time: string; speed: number; battery: number; latency: number }
export interface Detection { id: string; label: string; confidence: number; box: [number,number,number,number] }
export interface Experiment { id: string; name: string; success: number; missionTime: number; precision: number; latency: number; interventions: number }
export interface Snapshot { robot: Robot; missions: Mission[]; telemetry: Telemetry[] }
