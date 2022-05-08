export class ResultType {
  constructor(public success: boolean, public message: string) {}
}

export const noAuthReturn: Promise<ResultType> = Promise.resolve({
  success: false,
  message: '권한이 없습니다.',
});

export const authorNotValid: Promise<ResultType> = Promise.resolve({
  success: false,
  message: '작성자 정보가 올바르지 않습니다.',
});

export const databaseError: Promise<ResultType> = Promise.resolve({
  success: false,
  message: '데이터베이스 오류입니다.',
});

export const successWrite: Promise<ResultType> = Promise.resolve({
  success: true,
  message: '작성에 성공했습니다.',
});

export const successRegist: Promise<ResultType> = Promise.resolve({
  success: true,
  message: '등록에 성공했습니다.',
});

export const successUpdate: Promise<ResultType> = Promise.resolve({
  success: true,
  message: '수정에 성공했습니다.',
});

export const successDelete: Promise<ResultType> = Promise.resolve({
  success: true,
  message: '삭제에 성공했습니다.',
});

export const nonExistentUser: Promise<ResultType> = Promise.resolve({
  success: false,
  message: '존재하지 않는 회원입니다.',
});

export const nonExistentTrainer: Promise<ResultType> = Promise.resolve({
  success: false,
  message: '존재하지 않는 트레이너입니다.',
});

export const nonExistentPT: Promise<ResultType> = Promise.resolve({
  success: false,
  message: '존재하지 않는 PT입니다.',
});

export const nonExistenBoard: Promise<ResultType> = Promise.resolve({
  success: false,
  message: '존재하지 않는 게시물입니다.',
});

export const nonExistenId: Promise<ResultType> = Promise.resolve({
  success: false,
  message: '존재하지 않는 아이디입니다.',
});

export const existenId: Promise<ResultType> = Promise.resolve({
  success: true,
  message: '존재하는 아이디입니다.',
});
