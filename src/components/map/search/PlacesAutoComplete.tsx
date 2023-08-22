'use client';
import useDebounce from '@/hooks/useDebounce';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import Input from '../../common/Input';
import { FormEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { placeIdState } from '@/recoil/mapStates';
import { useRouter } from 'next/navigation';

const PlacesAutoComplete = () => {
  const router = useRouter();
  const [openUl, setOpenUl] = useState<boolean>(false);
  const [inputLocation, setInputLocation] = useState<string>('');
  const debounceKeyword = useDebounce(inputLocation);
  const { data, isLoading } = useSWR<PlacesResponse>(
    debounceKeyword ? `api/map/search/${debounceKeyword}` : null,
  );
  const setPlaceIdState = useSetRecoilState(placeIdState);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLocation(e.target.value);
  };

  const onFocusHandler = () => {
    setOpenUl(true);
  };

  const onClickHandler = useCallback(
    (placeId: string) => {
      setPlaceIdState(placeId);
      setOpenUl(false);
      setInputLocation('');
      router.push(`/place/${placeId}`);
    },
    [router, setPlaceIdState],
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (data) {
        setPlaceIdState(data.predictions[0].place_id);
      }
      setOpenUl(false);
    },
    [data, setPlaceIdState],
  );

  return (
    <section className="flex flex-col justify-center items-center w-full pt-4 text-xs">
      {isLoading && <div>loading!</div>}
      <Input
        placeholder="지역명, 도로명, 지하철역으로 검색"
        value={inputLocation}
        onChange={onChangeHandler}
        onSubmit={onSubmit}
        onFocus={onFocusHandler}
      />
      {openUl && (
        <ul className="flex flex-col justify-center items-center bg-white w-full rounded-xl h-full">
          {data?.predictions.map((location, _) => {
            const { place_id, structured_formatting } = location;
            return (
              <li
                className="pl-3 py-2 "
                key={place_id}
                onClick={() => onClickHandler(place_id)}
              >
                {structured_formatting.main_text}
              </li>
            );
          })}
          {data?.predictions.length === 0 && <li>검색 결과가 없습니다.</li>}
        </ul>
      )}
    </section>
  );
};

export default PlacesAutoComplete;
