import type { Snapshot, Detection, Experiment } from '../types';
export const snapshot: Snapshot = {
 robot:{id:'AMR-01',name:'Atlas / inspection unit',state:'Idle',battery:87,sensors:[{name:'LiDAR · 360°',status:'Demo ready'},{name:'RGB camera',status:'Demo ready'},{name:'Wheel odometry',status:'Demo ready'},{name:'IMU',status:'Demo ready'}]},
 missions:[{id:'M-024',name:'Sector B · equipment inspection',state:'Completed',duration:284,distance:42.8,obstacles:3,anomalies:2},{id:'M-023',name:'Sector A · perimeter patrol',state:'Completed',duration:312,distance:56.2,obstacles:5,anomalies:0},{id:'M-022',name:'Loading bay · visual inspection',state:'Error',duration:148,distance:21.4,obstacles:2,anomalies:1}],
 telemetry:[{time:'00:00',speed:0,battery:90,latency:28},{time:'00:30',speed:0.6,battery:90,latency:34},{time:'01:00',speed:0.8,battery:89,latency:29},{time:'01:30',speed:0.5,battery:89,latency:41},{time:'02:00',speed:0.9,battery:88,latency:32},{time:'02:30',speed:0.7,battery:88,latency:30},{time:'03:00',speed:0,battery:87,latency:36},{time:'03:30',speed:0.6,battery:87,latency:28}]
};
export const detections: Detection[]=[{id:'D-01',label:'Surface anomaly',confidence:0.94,box:[56,32,17,28]},{id:'D-02',label:'Inspection valve',confidence:0.98,box:[17,30,22,33]}];
export const experiments: Experiment[]=[{id:'E01',name:'Baseline',success:72,missionTime:342,precision:78,latency:56,interventions:7},{id:'E02',name:'Route A',success:81,missionTime:310,precision:83,latency:48,interventions:5},{id:'E03',name:'Route B',success:86,missionTime:295,precision:87,latency:40,interventions:3},{id:'E04',name:'Tuned',success:92,missionTime:284,precision:91,latency:32,interventions:2}];
export const events=[['03:42','Inspection checkpoint reached','Inspection'],['03:18','Obstacle avoidance waypoint selected','Navigation'],['02:56','Sample surface anomaly annotated','Vision'],['00:00','Demonstration mission initialized','System']];
export const architecture=[
 {name:'Webots Simulator',status:'Planned',role:'Physics, robot model and industrial world.',input:'World files, robot configuration',output:'Sensor streams and simulation clock'},
 {name:'Python Robot Controller',status:'Planned',role:'Robot lifecycle, actuation and mission execution.',input:'Mission commands, sensor frames',output:'Motor commands and robot state'},
 {name:'Navigation & Perception',status:'Planned',role:'Path planning, obstacle avoidance and visual inspection.',input:'Camera, LiDAR and odometry',output:'Waypoints, detections and confidence'},
 {name:'FastAPI Backend',status:'Planned',role:'Validate contracts and expose REST / WebSocket APIs.',input:'Controller events and UI commands',output:'Typed API responses and telemetry'},
 {name:'PostgreSQL / Telemetry',status:'Planned',role:'Persist missions, timestamped observations and experiments.',input:'Validated telemetry and detections',output:'Historical queries and experiment records'},
 {name:'React Dashboard',status:'Implemented',role:'Interactive portfolio, deterministic fixtures and independent 3D preview.',input:'Local demo adapter (currently)',output:'Mission views, charts and inspection overlays'}
];
