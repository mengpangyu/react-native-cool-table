import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

interface DemoLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  extraInfo?: React.ReactNode;
  features?: string[];
  scrollable?: boolean;
}

const DemoLayout: React.FC<DemoLayoutProps> = ({
  title,
  description,
  children,
  extraInfo,
  features,
  scrollable = false,
}) => {
  const content = (
    <>
      <View style={commonStyles.header}>
        <Text style={commonStyles.title}>{title}</Text>
        <Text style={commonStyles.description}>{description}</Text>
        {extraInfo}
      </View>

      {children}

      {features && features.length > 0 && (
        <View style={commonStyles.features}>
          <Text style={commonStyles.featuresTitle}>功能特点：</Text>
          {features.map((feature) => (
            <Text key={feature} style={commonStyles.featureItem}>
              • {feature}
            </Text>
          ))}
        </View>
      )}
    </>
  );

  if (scrollable) {
    return (
      <ScrollView
        style={commonStyles.container}
        showsVerticalScrollIndicator={false}
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={commonStyles.container}>{content}</View>;
};

export default DemoLayout;
