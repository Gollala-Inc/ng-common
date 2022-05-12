interface Wholesale {
  description?: string; // 도매 정보
  type: string; // 아이디 타입
  id: string; // 아이디
  name: string; // 도매명
  wsSeq: string; // 시퀀스 넘버
}

export interface CustomCartItemModel {
  _id: string; // CustomCartItem 아이디
  wholesaleName?: string; // 도매명
  wholesale?: Wholesale; // 도매
  building?: string; // 도매 건물
  floor?: string; // 도매 층
  room?: string; // 도매 호
  address?: string; // 통합 주소
  phone?: string; // 전화번호
  productName?: string; // 제품명
  productImage?: string; // 제품 이미지
  product?: string; // 제품 아이디
  retailProductName?: string; // 소매 제품명
  color?: string; // 상품 책상
  size?: string; // 상품 사이즈
  options?: string; // 통합 옵션
  price?: string; // 상품 가격
  quantity: number; // 상품 수량
  comment: string; // 비고
  others?: string[]; // 기타
  createdAt?: string; // 모델 생성일
  updatedAt?: string; // 모델 수정일
}

export type CustomCartItemsModel = CustomCartItemModel[];
