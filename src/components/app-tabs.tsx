import { Tabs } from 'expo-router';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

function CustomTabBar({ state, navigation }: any) {
  const colors = useTheme();

  const tabs = [
    {
      name: 'index',
      label: 'Home',
      icon: require('@/assets/images/tabIcons/home.png'),
    },
    {
      name: 'explore',
      label: 'Explore',
      icon: require('@/assets/images/compass.png'),
    },
    {
      name: 'books',
      label: 'My Books',
      icon: require('@/assets/images/book-open-cover.png'),
    },
  ];

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.background,
          borderColor: colors.backgroundElement,
        },
      ]}
    >
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: state.routes[index].key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(state.routes[index].name);
          }
        };

        return (
          <Pressable
            key={tab.name}
            onPress={onPress}
            style={styles.tab}
          >
            <Image
              source={tab.icon}
              style={[
                styles.icon,
                {
                  tintColor: isFocused
                    ? colors.text
                    : colors.text + '80',
                },
              ]}
              resizeMode="contain"
            />

            <Text
              style={[
                styles.label,
                {
                  color: isFocused
                    ? colors.text
                    : colors.text + '0',
                },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />

      <Tabs.Screen
        name="books"
        options={{
          title: 'My Books',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',

    // Touch both sides of the screen
    left: 0,
    right: 0,
    bottom: 50,

    minHeight: 65,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    // Border
    borderWidth: 1,

    // Curved top corners
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    // Keep bottom corners square
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,

    paddingTop: 8,
    paddingBottom: 8,

    // Android shadow
    elevation: 8,

    // iOS shadow
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },

  icon: {
    width: 24,
    height: 24,
  },

  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});