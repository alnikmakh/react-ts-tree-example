import { createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction, Action } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { TopicEntity, TOPICS } from './topics';

const initialState = {
  structure: TOPICS,
  editId: undefined,
  branchesStates: {},
  isDragging: false,
  overTopic: '0',
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    setTree: (state, action: PayloadAction<TopicEntity[]>) => {
      state = action.payload;
    },
    setOpenBranches: (state, action: PayloadAction<string[] | undefined>) => {
      if (action.payload) {
        action.payload.forEach((topicId) => {
          state.branchesStates[topicId] = true;
        });
      }
    },
    toggleBranch: (state, action: PayloadAction<string>) => {
      state.branchesStates[action.payload] =
        !state.branchesStates[action.payload];
    },
    setIsDragging: (state, action: PayloadAction<string>) => {
      state.isDragging = action.payload;
    },
    setOverTopic: (state, action: PayloadAction<string>) => {
      state.overTopic = action.payload;
    },
  },
});

export const { setTree, setOpenBranches, toggleBranch, setIsDragging } =
  treeSlice.actions;
export default treeSlice.reducer;

export const selectOverTopic = (state) => {
  return state.tree.overTopic;
};

export const selectIsDragging = (state) => {
  return state.tree.isDragging;
};

export const selectTree = (state) => {
  return state.tree.structure;
};

export const selectBranchesStates = (state) => {
  return state.tree.branchesStates;
};

export const selectTreeMap = createSelector(
  (state) => state.tree.structure,
  (tree) => {
    const getMapTree = (topics: TopicEntity[], posts: TopicEntity[]) => {
      const result = new Map();
      topics.forEach((topic) => {
        result.set(topic.id, getMapTree(topic.children, topic.posts));
      });
      posts.forEach((post) => {
        result.set(post.id, getMapTree(post.children, post.posts));
      });

      return result;
    };

    return getMapTree(tree, []);
  }
);

type TopicEntityMap = Map<string, TopicEntityMap>;

export const selectTreeIndexes = createSelector(selectTreeMap, (treeMap) => {
  const runTreeTraversalToCollectIndexes = (
    topicsMap: TopicEntityMap,
    resultMap: Map<string, string[]>,
    indexedQueue: string[] = []
  ) => {
    topicsMap.forEach((childMap, key) => {
      resultMap.set(key, indexedQueue);
      if (childMap.size) {
        const localIndexedQueue = [...indexedQueue];
        localIndexedQueue.push(key);
        runTreeTraversalToCollectIndexes(
          childMap,
          resultMap,
          localIndexedQueue
        );
      }
    });
  };

  const result = new Map();

  runTreeTraversalToCollectIndexes(treeMap, result);

  return result;
});
