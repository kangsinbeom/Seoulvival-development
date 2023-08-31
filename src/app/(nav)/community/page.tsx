import { v4 as uuidv4 } from 'uuid';
import { categoryKO } from '@/utils/utilFunc';
import CommunityBoardList from '@/components/community/CommunityBoardList';

import { fetchCommunity } from '@/actions/fetchCommunity';
import CommunityHotTag from '@/components/community/CommunityHotTag';
import WriteButton from '@/components/map/actions/WriteButton';
import BottomSheet from '@/components/BottomSheet';
import SigninButtons from '@/components/auth/signin/SigninButtons';
import { loginBottomSheetState } from '@/recoil/bottomsheet';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
const CommunityPage = async ({ searchParams }: PageProps) => {
  const category = searchParams.category ? searchParams.category : 'All';
  const tags = searchParams.tag ? searchParams.tag || [] : null;
  const ordertype = (searchParams.ordertype || 'newer') as 'newer' | 'popular';
  const FetchUrl =
    category === 'All' ? 'All' : `category?category=${categoryKO(category)}`;
  const FETCH_API = `${process.env.NEXT_PUBLIC_SERVER}/tags/${FetchUrl}`;

  const TagCategory = await fetch(FETCH_API, {
    next: { revalidate: 2000 },
  }).then<string[]>((res) => res.json());
  const lists = await fetchCommunity({
    page: 1,
    limit: 10,
    category,
    ordertype,
    tags,
  }).then((res) => res);

  return (
    <section className="w-full max-w-md flex flex-col relative" key={uuidv4()}>
      {TagCategory && (
        <CommunityHotTag Hottag={TagCategory} category={category} />
      )}
      <CommunityBoardList
        firstList={lists?.result ?? []}
        Category={category}
        tags={tags}
        totalpage={lists?.pageable.totalPages ?? 1}
        ordertype={ordertype}
      />
      <WriteButton section="home" />
      {/* <BottomSheet state={loginBottomSheetState}> */}
      {/* <div className="flex flex-col w-full h-full pb-2.5">
        <div className="text-center text-black text-xl font-semibold leading-normal">
          로그인 후 서울바이벌을 즐겨보세요!
        </div>
        <div className="text-center text-neutral-500 text-base font-normal leading-normal">
          서울바이벌 회원만이 선택한 기능을 이용할 수 있어요
        </div>
      </div>
      <SigninButtons callbackUrl="" /> */}
      {/* </BottomSheet> */}
    </section>
  );
};
export default CommunityPage;
