import * as React from 'react';
import { useMemo, useState } from 'react';

import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';

import DemoNavigation, { DemoItem } from './components/DemoNavigation';
import BasicTableDemo from './demos/BasicTableDemo';
import SortableTableDemo from './demos/SortableTableDemo';
import ExpandableTableDemo from './demos/ExpandableTableDemo';
import FixedColumnDemo from './demos/FixedColumnDemo';
import CustomRenderDemo from './demos/CustomRenderDemo';
import InteractiveDemo from './demos/InteractiveDemo';
import PerformanceDemo from './demos/PerformanceDemo';

const DEMOS: DemoItem[] = [
  {
    id: 'basic',
    title: '基础表格',
    description: '简单数据展示',
    component: BasicTableDemo,
  },
  {
    id: 'sortable',
    title: '排序表格',
    description: '点击表头排序',
    component: SortableTableDemo,
  },
  {
    id: 'expandable',
    title: '可展开表格',
    description: '树形数据展示',
    component: ExpandableTableDemo,
  },
  {
    id: 'fixed',
    title: '固定列表格',
    description: '左侧列固定',
    component: FixedColumnDemo,
  },
  {
    id: 'custom',
    title: '自定义渲染',
    description: '丰富的单元格',
    component: CustomRenderDemo,
  },
  {
    id: 'interactive',
    title: '交互式表格',
    description: '多种交互操作',
    component: InteractiveDemo,
  },
  {
    id: 'performance',
    title: '性能测试',
    description: '大数据量测试',
    component: PerformanceDemo,
  },
];

export default function App() {
  const [currentDemo, setCurrentDemo] = useState('basic');

  const CurrentDemoComponent = useMemo(() => {
    const found = DEMOS.find((d) => d.id === currentDemo);
    return found ? found.component : BasicTableDemo;
  }, [currentDemo]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <DemoNavigation
        demos={DEMOS}
        currentDemo={currentDemo}
        onDemoChange={setCurrentDemo}
      />
      <View style={styles.demoContainer}>
        <CurrentDemoComponent />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  demoContainer: {
    flex: 1,
  },
});
