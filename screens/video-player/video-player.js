import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import videoPlayerStyles from "../../css-styles/video-player/video-player-styles";
import { Video, ResizeMode } from "expo-av";
import Loader from "../../components/shared/loader";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { useNavigationContext } from "../../context/nagivation-context";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      return JSON.parse(result);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving value:", error);
    return null;
  }
}

export default function VideoPlayer() {
  const video = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [videoProps, setVideoProps] = useState(null);
  const navigation = useNavigation();
  const { setSelectedRoute } = useNavigationContext();

  const route = useRoute();

  useEffect(() => {
    const loadVideoProps = async () => {
      if (!route.params?.videoProps) {
        const storedVideoProps = await getValueFor("videoProps");
        if (storedVideoProps) {
          setVideoProps(storedVideoProps);
        } else {
          Alert.alert(
            "Error, aún no cargaste un video",
            "Por favor hace clic en algun video del inicio"
          );
          navigation.navigate("Home");
          setSelectedRoute(1);
        }
      } else {
        const newVideoProps = route.params?.videoProps;
        setVideoProps(newVideoProps);
        save("videoProps", JSON.stringify(newVideoProps));
      }
    };

    loadVideoProps();
  }, [route.params?.videoProps]);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoaded = () => {
    setIsLoading(false);
  };

  return (
    <View style={videoPlayerStyles.container}>
      {isLoading ? <Loader /> : ""}
      <View style={videoPlayerStyles.videoContainer}>
        {videoProps && (
          <Video
            ref={video}
            source={{
              uri: videoProps.videoUrl,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            style={videoPlayerStyles.video}
            onLoad={handleLoaded}
            onLoadStart={handleLoadStart}
            onError={(error) => {
              console.error(error);
            }}
            shouldPlay={true}
          />
        )}
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 72 }}
      >
        {videoProps && (
          <View style={videoPlayerStyles.informationContainer}>
            <Text style={videoPlayerStyles.informationContainerTitle}>
              {videoProps.title}
            </Text>
            <Text style={videoPlayerStyles.informationContainerDescription}>
              {videoProps.description}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
