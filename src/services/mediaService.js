import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

class MediaService {
  /**
   * Request camera permissions
   */
  async requestCameraPermissions() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  }

  /**
   * Request media library permissions
   */
  async requestMediaLibraryPermissions() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  }

  /**
   * Pick image from library
   */
  async pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        return result.assets[0];
      }
      return null;
    } catch (error) {
      console.error('Image picker error:', error);
      throw error;
    }
  }

  /**
   * Pick video from library
   */
  async pickVideo() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        return result.assets[0];
      }
      return null;
    } catch (error) {
      console.error('Video picker error:', error);
      throw error;
    }
  }

  /**
   * Take photo with camera
   */
  async takePhoto() {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        return result.assets[0];
      }
      return null;
    } catch (error) {
      console.error('Camera error:', error);
      throw error;
    }
  }

  /**
   * Record video with camera
   */
  async recordVideo() {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 90, // 90 seconds for Shorts/Reels
      });

      if (!result.canceled) {
        return result.assets[0];
      }
      return null;
    } catch (error) {
      console.error('Video recording error:', error);
      throw error;
    }
  }

  /**
   * Generate video thumbnail
   */
  async generateThumbnail(videoUri, time = 0) {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: time * 1000, // Convert to milliseconds
      });
      return uri;
    } catch (error) {
      console.error('Thumbnail generation error:', error);
      throw error;
    }
  }

  /**
   * Crop image
   */
  async cropImage(uri, cropData) {
    try {
      const manipResult = await manipulateAsync(
        uri,
        [{ crop: cropData }],
        { compress: 1, format: SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (error) {
      console.error('Image crop error:', error);
      throw error;
    }
  }

  /**
   * Resize image
   */
  async resizeImage(uri, width, height) {
    try {
      const manipResult = await manipulateAsync(
        uri,
        [{ resize: { width, height } }],
        { compress: 1, format: SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (error) {
      console.error('Image resize error:', error);
      throw error;
    }
  }

  /**
   * Rotate image
   */
  async rotateImage(uri, degrees) {
    try {
      const manipResult = await manipulateAsync(
        uri,
        [{ rotate: degrees }],
        { compress: 1, format: SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (error) {
      console.error('Image rotate error:', error);
      throw error;
    }
  }

  /**
   * Save media to library
   */
  async saveToLibrary(uri) {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      return asset;
    } catch (error) {
      console.error('Save to library error:', error);
      throw error;
    }
  }

  /**
   * Get file info
   */
  async getFileInfo(uri) {
    try {
      const info = await FileSystem.getInfoAsync(uri);
      return info;
    } catch (error) {
      console.error('Get file info error:', error);
      throw error;
    }
  }

  /**
   * Delete file
   */
  async deleteFile(uri) {
    try {
      await FileSystem.deleteAsync(uri);
    } catch (error) {
      console.error('Delete file error:', error);
      throw error;
    }
  }

  /**
   * Get video duration
   */
  async getVideoDuration(uri) {
    try {
      // This is a placeholder - actual implementation would use expo-av
      // to load the video and get its duration
      return 0;
    } catch (error) {
      console.error('Get video duration error:', error);
      throw error;
    }
  }
}

export default new MediaService();
