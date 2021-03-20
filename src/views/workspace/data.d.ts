interface StatisticItem {
  projectNum: number;
  teamRank: number;
  visitNum: number;
}

interface ProjectItem {
  id: number;
  title: string;
  cover: string;
  description: string;
}
interface ActivitiesItem {
  id: number;
  avatar: string;
  nickname: string;
  project: string;
  action: string;
  event: string;
  time: string;
}

interface TeamsItem {
  id: number;
  avatar: string;
  name: string;
}

interface RadarItem {
  item: string;
  user: string;
  score: number;
}

interface RespDataType {
  statistic: StatisticItem;
  currentUser: {
    avatar: string;
    name: string;
  };
  projects: ProjectItem[];
  activities: ActivitiesItem[];
  teams: TeamsItem[];
}
