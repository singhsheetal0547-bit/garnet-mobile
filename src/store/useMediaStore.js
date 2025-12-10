import { create } from 'zustand';

const useMediaStore = create((set, get) => ({
  // Current media being edited
  currentMedia: null,
  mediaType: null, // 'image' | 'video' | 'audio'
  
  // Editor state
  editorMode: 'view', // 'view' | 'trim' | 'crop' | 'text' | 'sticker'
  editHistory: [],
  currentEditIndex: -1,
  
  // AI generated content
  generatedCaptions: [],
  generatedHashtags: [],
  selectedCaption: null,
  
  // Publishing state
  publishPlatforms: [], // ['youtube', 'instagram', 'tiktok']
  scheduledTime: null,
  
  // Actions
  setCurrentMedia: (media, type) => set({ 
    currentMedia: media, 
    mediaType: type,
    editHistory: [media],
    currentEditIndex: 0,
  }),
  
  clearCurrentMedia: () => set({ 
    currentMedia: null, 
    mediaType: null,
    editHistory: [],
    currentEditIndex: -1,
    generatedCaptions: [],
    generatedHashtags: [],
    selectedCaption: null,
  }),
  
  setEditorMode: (mode) => set({ editorMode: mode }),
  
  addToHistory: (media) => {
    const { editHistory, currentEditIndex } = get();
    const newHistory = editHistory.slice(0, currentEditIndex + 1);
    newHistory.push(media);
    set({ 
      editHistory: newHistory,
      currentEditIndex: newHistory.length - 1,
      currentMedia: media,
    });
  },
  
  undo: () => {
    const { editHistory, currentEditIndex } = get();
    if (currentEditIndex > 0) {
      const newIndex = currentEditIndex - 1;
      set({ 
        currentEditIndex: newIndex,
        currentMedia: editHistory[newIndex],
      });
    }
  },
  
  redo: () => {
    const { editHistory, currentEditIndex } = get();
    if (currentEditIndex < editHistory.length - 1) {
      const newIndex = currentEditIndex + 1;
      set({ 
        currentEditIndex: newIndex,
        currentMedia: editHistory[newIndex],
      });
    }
  },
  
  canUndo: () => {
    const { currentEditIndex } = get();
    return currentEditIndex > 0;
  },
  
  canRedo: () => {
    const { editHistory, currentEditIndex } = get();
    return currentEditIndex < editHistory.length - 1;
  },
  
  setGeneratedCaptions: (captions) => set({ generatedCaptions: captions }),
  
  setGeneratedHashtags: (hashtags) => set({ generatedHashtags: hashtags }),
  
  setSelectedCaption: (caption) => set({ selectedCaption: caption }),
  
  togglePublishPlatform: (platform) => {
    const { publishPlatforms } = get();
    const newPlatforms = publishPlatforms.includes(platform)
      ? publishPlatforms.filter(p => p !== platform)
      : [...publishPlatforms, platform];
    set({ publishPlatforms: newPlatforms });
  },
  
  setScheduledTime: (time) => set({ scheduledTime: time }),
  
  resetPublishState: () => set({ 
    publishPlatforms: [],
    scheduledTime: null,
  }),
}));

export default useMediaStore;
