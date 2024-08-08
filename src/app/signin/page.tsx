import SigninButtons from '@/components/auth/signin/SigninButtons';
import Icons from '@/components/common/Icons';
import { close } from '@/utils/Icon';
import dynamic from 'next/dynamic';

const DynamicCancelIcon = dynamic(
  () => import('@/components/auth/signin/SigninCancelIcon'),
  { ssr: false, loading: () => <Icons path={close} fill="#404040" /> },
);

const SignIpPage = () => {
  return (
    <section className="flex flex-col">
      <DynamicCancelIcon />
      <div>
        <span className="text-neutral-700 text-2xl font-semibold leading-9">
          서울라이프의 첫 걸음,
          <br />
        </span>
        <span className="text-teal-400 text-2xl font-semibold leading-9">
          SEOULVIVAL
        </span>
        <span className="text-neutral-700 text-2xl font-semibold leading-9">
          과<br />
          함께하세요!
        </span>
      </div>
      <div>
        <div className="w-full h-10 relative flex items-center justify-center">
          <span className="bg-white z-10 px-3 text-zinc-400">
            SNS로 간편하게 로그인하세요
          </span>
          <div className="absolute top-0 w-full h-5 border-b border-b-zinc-400 " />
        </div>
        <SigninButtons />
      </div>
    </section>
  );
};
export default SignIpPage;
