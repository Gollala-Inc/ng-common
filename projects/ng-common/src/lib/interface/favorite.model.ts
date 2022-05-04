export type FavoriteTypes =  'product' | 'wholesale' | 'marketReport' | 'styling';

export interface MyFavorite {
  _id: string; // Document Id
  customer: string; // 고객 아이디
  type: FavoriteTypes; // 찜하기 타입
  targetId: string; // 찜한 객체의 Document Id
  createdAt: string; // 모델 생성일
  updatedAt: string; // 모델 수정일
}
