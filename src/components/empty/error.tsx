import React from 'react';

import { Button, Empty, Typography } from '@arco-design/web-react';

import TroubleShootingSVG from '@/assets/images/trouble-shooting.svg';
import { IconRestartSquareBoldDuotone } from '@/components/icons';
import { cn } from '@/utils/helper.ts';

type Props = {
  description: React.ReactNode;
};

export const EmptyError = ({ description }: Props) => {
  return (
    <Empty
      icon={
        <img
          alt="empty error"
          className={cn('!w-[400px] !h-[400px]')}
          src={TroubleShootingSVG}
        />
      }
      description={description}
    />
  );
};

export type EmptyRequestErrorProps = {
  refetch: () => void;
  error: string;
};

export const EmptyRequestError = ({
  refetch,
  error,
}: EmptyRequestErrorProps) => {
  return (
    <EmptyError
      description={
        <div className="flex flex-col space-y-4 items-center justify-center">
          <Typography.Text type="error">{error}</Typography.Text>

          <Button
            className="ml-4"
            icon={<IconRestartSquareBoldDuotone />}
            onClick={() => {
              refetch();
            }}
          >
            重试
          </Button>
        </div>
      }
    />
  );
};
