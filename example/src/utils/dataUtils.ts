// 常用数据生成工具

// 随机选择数组中的元素
export const randomChoice = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// 生成随机整数
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 生成随机日期字符串
export const randomDate = (startYear = 2020, endYear = 2024): string => {
  const year = randomInt(startYear, endYear);
  const month = String(randomInt(1, 12)).padStart(2, '0');
  const day = String(randomInt(1, 28)).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 常用名字列表
export const names = [
  '张三',
  '李四',
  '王五',
  '赵六',
  '孙七',
  '周八',
  '吴九',
  '郑十',
  '陈一',
  '刘二',
  '黄三',
  '杨四',
  '朱五',
  '秦六',
  '许七',
  '何八',
  '吕九',
  '施十',
  '张伟',
  '王伟',
  '王芳',
  '李伟',
  '李娜',
  '张敏',
  '李静',
  '王静',
  '刘伟',
  '王秀英',
  '陈伟',
  '王丽',
  '李秀英',
  '张静',
];

// 常用城市列表
export const cities = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '成都',
  '武汉',
  '西安',
  '南京',
  '天津',
  '苏州',
  '重庆',
  '长沙',
  '青岛',
  '大连',
  '厦门',
];

// 常用部门列表
export const departments = [
  '技术部',
  '产品部',
  '设计部',
  '运营部',
  '市场部',
  '销售部',
  '人事部',
  '财务部',
  '法务部',
  '行政部',
  '客服部',
  '品控部',
];

// 常用状态列表
export const statuses = ['在职', '试用期', '离职'];
export const onlineStatuses = ['online', 'offline', 'busy'];
export const priorities = ['high', 'medium', 'low'];
export const prioritiesCN = ['高', '中', '低'];

// 常用技能标签
export const skills = [
  'React',
  'Vue',
  'Angular',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Python',
  'Java',
  'Go',
  'PHP',
  'Swift',
  'Kotlin',
  'Flutter',
  'UI设计',
  'UX设计',
  'Figma',
  'Sketch',
  'Photoshop',
  'Illustrator',
  '产品策划',
  '需求分析',
  '数据分析',
  '项目管理',
  'Scrum',
  'Agile',
];

// 生成基础用户数据
export const generateBasicUsers = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: randomChoice(names),
    age: randomInt(22, 45),
    city: randomChoice(cities),
    score: randomInt(60, 100),
  }));
};

// 生成员工数据
export const generateEmployees = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: randomChoice(names),
    age: randomInt(22, 45),
    department: randomChoice(departments),
    salary: randomInt(8000, 30000),
    email: `user${index + 1}@example.com`,
    phone: `1${randomInt(30, 99)}****${String(randomInt(1000, 9999))}`,
    status: randomChoice(statuses),
    joinDate: randomDate(2020, 2024),
  }));
};

// 生成学生成绩数据
export const generateStudentScores = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: randomChoice(names),
    math: randomInt(60, 100),
    english: randomInt(60, 100),
    physics: randomInt(60, 100),
    get total() {
      return this.math + this.english + this.physics;
    },
  }));
};

// 生成销售数据
export const generateSalesData = (count: number) => {
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  return Array.from({ length: count }, (_, index) => {
    const data: any = {
      id: index + 1,
      name: randomChoice(names),
      department: randomChoice([
        '华北区',
        '华东区',
        '华南区',
        '西南区',
        '西北区',
      ]),
    };

    // 生成12个月的销售数据
    months.forEach((month) => {
      data[month] = randomInt(8000, 30000);
    });

    return data;
  });
};

// 生成任务数据
export const generateTasks = (count: number) => {
  const taskTitles = [
    '完成用户注册功能',
    '优化数据库查询性能',
    '设计新版本UI界面',
    '编写API文档',
    '修复登录页面bug',
    '实现支付功能',
    '添加消息推送',
    '优化页面加载速度',
    '实现数据导出功能',
    '完善用户权限系统',
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: randomChoice(taskTitles),
    assignee: randomChoice(names),
    priority: randomChoice(priorities),
    status: randomChoice(['todo', 'inprogress', 'done']),
    dueDate: randomDate(2024, 2025),
    progress: randomInt(0, 100),
  }));
};

// 生成用户资料数据
export const generateUserProfiles = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    avatar: `https://i.pravatar.cc/100?img=${(index % 70) + 1}`,
    name: randomChoice(names),
    email: `user${index + 1}@example.com`,
    status: randomChoice(onlineStatuses),
    level: randomChoice(['SVIP', 'VIP', '普通']),
    score: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0-5.0
    tags: Array.from({ length: randomInt(2, 4) }, () => randomChoice(skills)),
    joinDate: randomDate(2020, 2024),
    lastLogin: `2024-10-${String(randomInt(1, 14)).padStart(2, '0')} ${String(
      randomInt(8, 18)
    ).padStart(2, '0')}:${String(randomInt(0, 59)).padStart(2, '0')}`,
  }));
};

// 排序工具函数
export const sortData = <T>(
  data: T[],
  key: string,
  sort: 'asc' | 'desc'
): T[] => {
  return [...data].sort((a, b) => {
    const aVal = (a as any)[key];
    const bVal = (b as any)[key];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sort === 'asc' ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();

    if (sort === 'asc') {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });
};
