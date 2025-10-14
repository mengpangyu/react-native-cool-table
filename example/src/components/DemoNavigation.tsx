import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export interface DemoItem {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

interface DemoNavigationProps {
  demos: DemoItem[];
  currentDemo: string;
  onDemoChange: (demoId: string) => void;
}

const DemoNavigation: React.FC<DemoNavigationProps> = ({
  demos,
  currentDemo,
  onDemoChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>表格功能演示</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {demos.map((demo) => (
          <TouchableOpacity
            key={demo.id}
            style={[
              styles.demoButton,
              currentDemo === demo.id && styles.activeDemoButton,
            ]}
            onPress={() => onDemoChange(demo.id)}
          >
            <Text
              style={[
                styles.demoButtonText,
                currentDemo === demo.id && styles.activeDemoButtonText,
              ]}
            >
              {demo.title}
            </Text>
            <Text style={styles.demoDescription}>{demo.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  demoButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  activeDemoButton: {
    backgroundColor: '#1890ff',
  },
  demoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  activeDemoButtonText: {
    color: '#fff',
  },
  demoDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default DemoNavigation;
