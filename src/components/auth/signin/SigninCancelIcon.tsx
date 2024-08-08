'use client';

import Icons from '@/components/common/Icons';
import { close } from '@/utils/Icon';
import { useRouter } from 'next/navigation';

const SigninCancelIcon = () => {
  const route = useRouter();
  return (
    <div className="pt-5 cursor-pointer">
      <Icons path={close} fill="#404040" onClick={() => route.back()} />
    </div>
  );
};

export default SigninCancelIcon;
