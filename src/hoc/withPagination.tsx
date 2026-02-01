import { ElementType, useCallback, useEffect } from "react";
import MainLoadingScreen from "src/components/MainLoadingScreen";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import {
  initiateItem,
  useLazyGetVideosByMediaTypeAndGenreIdQuery,
  useLazyGetVideosByMediaTypeAndCustomGenreQuery,
  useLazyGetVideosByLanguageQuery,
} from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";

export default function withPagination<T>(
  Component: ElementType,
  mediaType: MEDIA_TYPE,
  genre: Genre | CustomGenre
) {
  return function WithPagination(props: any) {
    const dispatch = useAppDispatch();
    const customGenre = genre as CustomGenre;
    const itemKey = genre.id ?? (customGenre.language ? `language_${customGenre.language}` : customGenre.apiString);

    const mediaState = useAppSelector((state) => state.discover[mediaType]);
    const pageState = mediaState ? mediaState[itemKey] : undefined;

    const [getVideosByMediaTypeAndGenreId] = useLazyGetVideosByMediaTypeAndGenreIdQuery();
    const [getVideosByMediaTypeAndCustomGenre] = useLazyGetVideosByMediaTypeAndCustomGenreQuery();
    const [getVideosByLanguage] = useLazyGetVideosByLanguageQuery();

    useEffect(() => {
      if (!mediaState || !pageState) {
        dispatch(initiateItem({ mediaType, itemKey }));
      }
    }, [mediaState, pageState, itemKey, mediaType, dispatch]);

    useEffect(() => {
      if (pageState && pageState.page === 0) {
        handleNext(pageState.page + 1);
      }
    }, [pageState]);

    const handleNext = useCallback((page: number) => {
      if (genre.id) {
        getVideosByMediaTypeAndGenreId({
          mediaType,
          genreId: genre.id,
          page,
        });
      } else if (customGenre.language) {
        getVideosByLanguage({
          mediaType,
          language: customGenre.language,
          page,
        });
      } else {
        getVideosByMediaTypeAndCustomGenre({
          mediaType,
          apiString: customGenre.apiString,
          page,
        });
      }
    }, [genre, customGenre, mediaType, getVideosByMediaTypeAndGenreId, getVideosByLanguage, getVideosByMediaTypeAndCustomGenre]);

    if (pageState) {
      return (
        <Component {...props} genre={genre} data={pageState} handleNext={handleNext} />
      );
    }
    return <MainLoadingScreen />;
  };
}
