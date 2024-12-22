import React, { PropsWithChildren } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from "react-native-reanimated";

import { CardData } from "@/types/CardsTypes";
interface CardProps extends CardData {
  cardIndex: number;
  animatedValue: SharedValue<number>;
  currentIndex: SharedValue<number>;
  previousIndex: SharedValue<number>;
  listLength: number;
}

export default function Card({
  name,
  set,
  cost,
  power,
  hp,
  type,
  traits,
  rarity,
  frontArt,
  cardIndex,
  animatedValue,
  currentIndex,
  previousIndex,
  listLength,
}: CardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      [cardIndex - 1, cardIndex, cardIndex + 1],
      [30, 1, -30],
    );
    const translateY2 = interpolate(
      animatedValue.value,
      [cardIndex - 1, cardIndex, cardIndex + 1],
      [30, 1, -30],
    );

    const scale = interpolate(
      animatedValue.value,
      [cardIndex - 1, cardIndex, cardIndex + 1],
      [0.9, 1, 1.1],
    );

    const opacity = interpolate(
      animatedValue.value,
      [cardIndex - 1, cardIndex, cardIndex + 1],
      [1, 1, 0],
    );

    return {
      transform: [
        {
          translateY:
            cardIndex === previousIndex.value ? translateY2 : translateY,
        },
        { scale },
      ],
      opacity:
        cardIndex < currentIndex.value + 3
          ? opacity
          : currentIndex.value + 3 - 1
            ? withTiming(1)
            : withTiming(0),
    };
  });

  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.END) {
          if (currentIndex.value !== 0) {
            animatedValue.value = withTiming((currentIndex.value -= 1));
            previousIndex.value = currentIndex.value - 1;
          }
        }
      }}
    >
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            if (currentIndex.value !== listLength - 1) {
              animatedValue.value = withTiming((currentIndex.value += 1));
              previousIndex.value = currentIndex.value;
            }
          }
        }}
      >
        <Animated.View
          style={[
            styles.card,
            animatedStyle,
            { zIndex: listLength - cardIndex },
          ]}
          testID="card"
        >
          <Text style={styles.cardTitle}>{name}</Text>
          <Image
            testID="card-image"
            source={{ uri: frontArt }}
            style={styles.image}
            resizeMode="contain"
          />

          <View style={styles.dataContainer}>
            <Block
              row
              style={{ marginLeft: 16, marginTop: 16, marginBottom: 8 }}
            >
              <Block>
                <Text style={styles.detail}>Set: {set}</Text>
                <Text style={styles.detail}>Type: {type}</Text>
                <Text style={styles.detail}>Cost: {cost}</Text>
              </Block>

              <Block>
                <Text style={styles.detail}>Power: {power}</Text>
                <Text style={styles.detail}>HP: {hp}</Text>
                <Text style={styles.detail}>Rarity: {rarity}</Text>
              </Block>
            </Block>

            <Block row>
              <Text style={styles.traits}>Traits: {traits?.join(", ")}</Text>
            </Block>
          </View>
        </Animated.View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

interface BlockProps {
  style?: StyleProp<ViewStyle>;
  flex?: ViewStyle["flex"];
  row?: boolean;
}

function Block({
  children,
  style,
  flex = 1,
  row,
  ...props
}: PropsWithChildren<BlockProps>) {
  const blockStyle = StyleSheet.flatten([
    flex !== undefined && { flex },
    row && ({ flexDirection: "row" } as ViewStyle),
    style,
  ]);

  return (
    <View style={blockStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    // flex: 1,
    backgroundColor: "#1F2937",
    // height: 375,
    // width: 300,

    // padding: 8,
    // marginRight: 8,
    // marginLeft: 8,
    // marginTop: -3,
    // flexDirection: "row",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },

  cardTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    margin: 16,
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 65, // TODO: ask about white tips on the images
  },

  dataContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  detail: {
    fontSize: 16,
    color: "#D1D5DB",
    marginBottom: 2,
  },

  traits: {
    fontSize: 16,
    color: "#D1D5DB",
    marginBottom: 8,
  },
});
