'use client';

import { followProfile, unfollowProfile } from '@/actions';
import { Follower } from '@prisma/client';
import { Button } from '@radix-ui/themes';
import { UserCheck, UserPlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface FollowButtonProps {
  profileIdToFollow: string;
  ourFollow?: Follower | null;
}

const FollowButton = ({
  profileIdToFollow,
  ourFollow = null,
}: FollowButtonProps) => {
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow);
  return (
    <form
      action={async () => {
        setIsFollowed((prev) => !prev);
        try {
          if (isFollowed) {
            await unfollowProfile(profileIdToFollow);
          } else {
            await followProfile(profileIdToFollow);
          }
          router.refresh();
        } catch (error) {
          console.error(error);
          setIsFollowed((prev) => !prev);
        }
      }}
    >
      {isFollowed ? (
        <Button color='green'>
          <UserPlusIcon />
          Unfollow
        </Button>
      ) : (
        <Button>
          <UserCheck />
          Follow
        </Button>
      )}
    </form>
  );
};

export default FollowButton;
