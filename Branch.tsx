import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TOPICS, TopicEntity } from './topics';
import { Link, useParams } from 'react-router-dom';
import styles from './branch.module.css';
import { selectBranchesStates, selectIsDragging, toggleBranch } from './slice';
import { useDroppable, useDraggable } from '@dnd-kit/core';

type BranchProps = {
  topic: TopicEntity;
};

export const Branch = ({ topic }: BranchProps) => {
  const dispatch = useDispatch();
  const { setNodeRef: setDropNodeRef } = useDroppable({ id: topic.id });
  const {
    setNodeRef: setDragNodeRef,
    attributes,
    listeners,
    transform,
  } = useDraggable({ id: topic.id });
  const { id } = useParams();
  const branchesStates = useSelector(selectBranchesStates);
  const isDragging = useSelector(selectIsDragging);
  const expanded = branchesStates[topic.id];
  const dragStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        position: 'absolute',
      }
    : undefined;

  return (
    <React.Fragment>
      <div className={`${styles.relative}`}>
        <div className={`${styles.listItem}`} style={dragStyle}>
          <Link
            to={`/${topic.id}`}
            className={`${styles.link}${
              topic.id === id ? ' ' + styles.selected : ''
            }`}
          >
            {topic.title}
          </Link>
          {(!!topic.children.length || !!topic.posts.length) && (
            <div
              className={styles.clickableIcon}
              onClick={() => {
                dispatch(toggleBranch(topic.id));
              }}
            >
              {expanded ? '-' : '+'}
            </div>
          )}
          <div
            style={
              isDragging
                ? { visibility: isDragging === topic.id ? 'visible' : 'hidden' }
                : {}
            }
            className={styles.dragableIcon}
            ref={setDragNodeRef}
            {...attributes}
            {...listeners}
          >
            {'D'}
          </div>
        </div>
      </div>
      <div
        style={{
          paddingLeft: '20px',
          maxHeight: expanded ? '100vh' : '0',
          transition: 'max-height ease 0.4s',
          ...(expanded ? {} : { overflow: 'hidden' }),
        }}
        onTransitionEnd={(event) => {
          if (expanded) {
            event.currentTarget.style.overflow = 'visible';
          }
        }}
        className={'content'}
      >
        <div ref={setDropNodeRef}>
          {topic.children.map((childTopic) => (
            <Branch topic={childTopic} key={childTopic.id} />
          ))}
          {topic.posts.map((childTopic) => (
            <Branch topic={childTopic} key={childTopic.id} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
