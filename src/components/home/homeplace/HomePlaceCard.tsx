/* eslint-disable @next/next/no-img-element */
'use client';
import { PlaceData } from '@/utils/constants/place';
import ModalPortal from '@/components/modal/ModalPortal';
import { useCallback, useState } from 'react';
import Modal from '@/components/layouts/Modal';
import HomePlaceCardDetails from './HomePlaceCardDetails';
import { CongestionLevelElemet } from '@/utils/utilFunc';
import Image from 'next/image';

export const PlaceCardSingleSkeleton = () => (
  <article className="skeleton flex flex-col w-52 min-w-[208px] h-40 relative scale-100 hover:scale-105 transition-all cursor-pointer">
    <div className="w-full bg-white h-40 rounded-2xl shadow-lg">
      <div className="relative flex w-full h-24 overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        <div className="w-full h-full bg-gray-300 animate-pulse"></div>
      </div>
      <div className="flex justify-between items-center px-4 pb-3 pt-1.5">
        <div className="flex flex-col">
          <div className="text-neutral-700 text-base font-semibold leading-7">
            <div className="w-24 h-4 bg-gray-300 animate-pulse mb-2"></div>
          </div>
          <div className="text-neutral-500 text-xs font-normal">
            <div className="w-32 h-3 bg-gray-300 animate-pulse"></div>
          </div>
        </div>

        <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-full">
          <div className="text-center text-white text-xs font-semibold leading-3">
            <div className="w-4 h-4 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </article>
);
export const PlaceCardSkeleton = () => {
  return (
    <section className=" ml-5 overflow-x-auto  whitespace-nowrap flex gap-2 scrollbar-hide">
      <div className="flex w-full h-52 px-3.5 py-2 gap-3.5">
        <PlaceCardSingleSkeleton />
        <PlaceCardSingleSkeleton />
      </div>
    </section>
  );
};

interface HomePlaceCardProps {
  list: CityData;
}

const HomePlaceCard = ({ list }: HomePlaceCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const ModalHandelClose = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);
  return (
    <article
      className="flex flex-col w-52 min-w-[208px] h-40 relative scale-100 hover:scale-105 transition-all cursor-pointer "
      onClick={() => setModalVisible(true)}
    >
      <div className="w-full bg-white h-40 rounded-2xl shadow-lg">
        <div className="relative flex w-full h-24 overflow-hidden rounded-tl-2xl rounded-tr-2xl">
          <Image
            src={`/placeimg/${list.AREA_NM}.webp`}
            alt={'imageNone'}
            // fill
            width={300}
            height={300}
            // sizes={'33vw'}
            quality={20}
            priority
            className="absolute top-0 right-0 left-0 bottom-0 object-cover"
          />
        </div>
        <div className="flex justify-between items-center px-4 pb-3 pt-1.5">
          <div className="flex flex-col">
            <div className="text-neutral-700 text-base font-semibold leading-7">
              {PlaceData[`${list.AREA_NM}`].simpleName}
            </div>
            <div className="text-neutral-500 text-xs font-normal">
              {PlaceData[`${list.AREA_NM}`].adress}
            </div>
          </div>

          <div
            className={`flex justify-center items-center w-8 h-8 ${
              CongestionLevelElemet(list.AREA_CONGEST_LVL).color
            } rounded-full`}
          >
            <div className="text-center text-white text-xs font-semibold leading-3">
              {CongestionLevelElemet(list.AREA_CONGEST_LVL).text}
            </div>
          </div>
        </div>
      </div>
      {modalVisible && (
        <ModalPortal nodeName="placePortal">
          <Modal onClose={() => ModalHandelClose()}>
            <HomePlaceCardDetails
              list={list}
              onClose={() => ModalHandelClose()}
            />
          </Modal>
        </ModalPortal>
      )}
    </article>
  );
};
export default HomePlaceCard;
