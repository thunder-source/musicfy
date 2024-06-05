import { useAppSelector } from '@/hooks/reduxHandlers';
import React from 'react';

type Props = {};

export default function IsPlayerOpenBottomMargin({}: Props) {
  const { isActive } = useAppSelector((state) => state.player);
  return isActive ? (
    <div className="block h-28">&nbsp;</div>
  ) : (
    <div className="max-lg:h-16 lg:hidden">&nbsp;</div>
  );
}
