import Dexie from 'dexie'

export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

const database = new Dexie('markdown-editor')
database.version(1).stores({ memos: '&datetime' })
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString()
  await memos.put({ datetime, title, text })
}

// テキスト履歴をリストで取得する関数を定義
// 戻り値は配列なので MemoRecord の末尾に [] をつけている。
export const getMemos = (): Promise<MemoRecord[]> => {
  return memos.orderBy('datetime')
    .reverse()  // 並び順を逆に
    .toArray()  // 取得したデータを配列にする
}