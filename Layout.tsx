import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styles from './layout.module.css';
import { selectTree, setOpenBranches, setIsDragging } from './slice';
import { Branch } from './Branch';
import { selectTreeIndexes } from './slice';
import { DndContext } from '@dnd-kit/core';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const tree = useSelector(selectTree);
  const indexes = useSelector(selectTreeIndexes);

  const onDragOver = (event) => {
    console.log(event.over?.id);
  };
  const onDragStart = (event) => {
    console.log(event);
    dispatch(setIsDragging(event.active.id));
  };
  const onDragEnd = (event) => {
    dispatch(setIsDragging(undefined));
  };

  React.useEffect(() => {
    // setTimeout for right sequence of rendering branches
    setTimeout(() => {
      dispatch(setOpenBranches(indexes.get(id)));
    }, 0);
  }, [id, indexes, dispatch]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <DndContext
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div style={{ width: '200px' }}>
            {tree.map((topic) => (
              <Branch topic={topic} key={topic.id} />
            ))}
          </div>
        </DndContext>
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
};
