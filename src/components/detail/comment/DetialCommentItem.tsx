'use client';
import { Comment, detailColThreeDotIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import UserProfile from '../../item/UserProfile';
import { useEffect, useRef, useState } from 'react';
import LikeCommentCase from './LikeCommentCase';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  buttonRefState,
  inputTextRefState,
  totalCommentState,
  totalCommentStateProps,
} from '@/recoil/commentState';
import { useSWRConfig } from 'swr';
interface DetialCommentItemProps {
  commentData: Comment;
  children: React.ReactNode;
  userNickname: string | undefined;
}

const DetialCommentItem = ({
  commentData,
  children,
  userNickname,
}: DetialCommentItemProps) => {
  const {
    commentLikeSize,
    createdAt,
    nickname,
    comment,
    commentId,
    commentHasLiked,
  } = commentData;
  const inputRef = useRecoilValue(inputTextRefState);
  const buttonRef = useRecoilValue(buttonRefState);
  const [onModal, setOnModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [recoilCommentState, setRecoilCommentState] =
    useRecoilState(totalCommentState);
  const defaultValue = {
    isReComment: false,
    isComment: true,
    commentId: null,
    isCommentChange: false,
    reCommentChange: false,
    reCommentId: null,
  };
  const [totalComment, setTotalComment] =
    useState<totalCommentStateProps>(defaultValue);
  const commentColor = totalComment.isReComment ? 'blue' : '#404040';
  const mutate = useSWRConfig();
  const handleClickOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setOnModal(false);
    }
    if (
      inputRef?.current &&
      !inputRef.current.contains(e.target) &&
      buttonRef?.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setTotalComment((prev) => ({ ...prev, isReComment: false }));
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (totalComment.isCommentChange !== recoilCommentState.isCommentChange) {
      setRecoilCommentState((prev) => ({
        ...prev,
        isReComment: false,
        isCommentChange: totalComment.isCommentChange,
        commentId,
        isComment: true,
      }));
    }
    if (totalComment.isReComment !== recoilCommentState.isReComment) {
      setRecoilCommentState((prev) => ({
        ...prev,
        isComment: false,
        isReComment: totalComment.isReComment,
        commentId,
        isCommentChange: false,
      }));
    }
  }, [totalComment]);

  const onClickDeleteHandler = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    try {
      const tokenValidResponse = await fetch('/api/user', {
        method: 'GET',
      });
      if (tokenValidResponse.status === 200) {
        const response = await fetch(`/api/comment/${commentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json());
      }
    } catch (error) {
    } finally {
      setOnModal(false);
    }
  };
  const onClickChagneHandler = () => {
    if (inputRef?.current) {
      inputRef.current?.focus();
      setTotalComment((prev) => ({
        ...prev,
        isCommentChange: !prev.isCommentChange,
      }));
    }
  };
  const onFocusHandler = () => {
    if (inputRef?.current) {
      inputRef.current?.focus();
      setTotalComment((prev) => ({ ...prev, isReComment: !prev.isReComment }));
    }
  };

  const likeHandler = async () => {
    try {
      const tokenValidResponse = await fetch('/api/user', {
        method: 'GET',
      });
      if (tokenValidResponse.status === 200) {
        const response = await fetch('/api/comment/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentId),
        }).then((respnse) => respnse.json());
      }
    } catch (error) {
    } finally {
      setOnModal(false);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between relative">
        <UserProfile createdAt={createdAt} nickname={nickname} />
        {userNickname === nickname && (
          <Icons
            path={detailColThreeDotIcon}
            onClick={() => setOnModal(true)}
          />
        )}
        {onModal && (
          <div
            className="flex flex-col absolute right-0 bg-white rounded-2xl"
            ref={modalRef}
          >
            <span className="text-blue-500" onClick={onClickChagneHandler}>
              {totalComment.isCommentChange ? '수정취소' : '수정하기'}
            </span>
            <span className="text-red-500" onClick={onClickDeleteHandler}>
              삭제하기
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 w-5/6 ml-auto">
        <span className="bg-neutral-100 p-2 rounded-lg text-xs">{comment}</span>
        <div className="flex flex-row gap-3">
          <div className="flex flex-row gap-1 items-center">
            <LikeCommentCase
              hasLiked={commentHasLiked}
              likeHandler={likeHandler}
              likeSize={commentLikeSize}
            />
            <span className="text-xs text-neutral-600">좋아요</span>
          </div>
          <div
            onClick={onFocusHandler}
            className="flex flex-row gap-1 items-center"
          >
            <Icons
              path={Comment}
              option={{
                fill: 'none',
                stroke: commentColor,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }}
            />
            <span className="text-xs text-neutral-600">답글쓰기</span>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DetialCommentItem;
