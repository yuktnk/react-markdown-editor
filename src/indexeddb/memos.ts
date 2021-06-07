import Dexie from "dexie";

export interface MemoRecord {
  datetime: string;
  title: string;
  text: string;
}

const database = new Dexie("markdown-editor");
database.version(1).stores({ memos: "&datetime" });
const memos: Dexie.Table<MemoRecord, string> = database.table("memos");

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString();
  await memos.put({ datetime, title, text });
};

// テキスト履歴をリストで取得する関数を定義
// 戻り値は配列なので MemoRecord の末尾に [] をつけている。
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE; // ページ数をもとに、取得する最初に位置（OFFSET）を算出
  return memos
    .orderBy("datetime")
    .reverse() // 並び順を逆に
    .offset(offset) //    取得するリスト内の開始位置を設定
    .limit(NUM_PER_PAGE)
    .toArray(); // 取得したデータを配列にする
};

const NUM_PER_PAGE: number = 10; // 1ページあたり10件

export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count(); // memos テーブルから総件数を取得(Dexie に定義された関数)
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE); // トータルの件数から1ページあたりの件数で割って、ページ数を算出
  return pageCount > 0 ? pageCount : 1;
};
