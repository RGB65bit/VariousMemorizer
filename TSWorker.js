//v1.1.8
function Cooker(Cooks){
  let CookedArray = []
  const RawLength = Cooks.length
  for(let x = 0; x < RawLength; x++){
    const Line = Cooks[x]
    if(Line === ""){
      continue
    }
    const LineSplited = Line.split(":")
    if(isNaN(LineSplited[0]) === true || LineSplited[0] === "" || LineSplited[0] === " " || LineSplited[1] === undefined || Number(LineSplited[0]) > 43200 || Number(LineSplited[0]) < 0 || !Number.isInteger(Number(LineSplited[0]))){
      continue
    }
    if(LineSplited.length >= 3){
      for(let y = 2; y < LineSplited.length; y++){
        LineSplited[1] = LineSplited[1] + ":" + LineSplited[y]
      }
    }
    const LineTime = LineSplited[0]
    const LineDescription = LineSplited[1]
    const Obj = {time:LineTime, Description:LineDescription}
    CookedArray.push(Obj)
  }
  return CookedArray
}
function Transformer(Input){
  let OutputText = "=====簡易タイムスタンプ=====\n"
  const ArrayLength = Input.length
  for(let x = 0; x < ArrayLength; x++){
    const ThisTime = Number(Input[x].time)
    const Description = Input[x].Description
    const TimeSec = String(ThisTime % 60).padStart(2,'0')
    const TimeMin = String(Math.floor(ThisTime / 60) % 60).padStart(2,'0')
    const TimeHou = String(Math.floor(Math.floor(ThisTime / 60) / 60)).padStart(2,'0')
    const TimeString = `${TimeHou}:${TimeMin}:${TimeSec}  ${Description}\n`
    OutputText = OutputText + TimeString
  }
  console.log(OutputText)
  return OutputText
}
function TSWorker(Target){
  const SherryTachibana = performance.now()
  Transformer(Cooker(Target))
  const KozueMone = performance.now()
  const TachibanaSherry = KozueMone - SherryTachibana
  console.log(`処理時間:${TachibanaSherry.toFixed(2)}ms。`)
}

//ここを書き換えて実行
//各要素は、"秒数:内容"の形で定義する。
//秒数は、配信開始からの秒数で、"hh:mm:ss"や、"hh時間mm分ss秒"ではない。
const RawExample = [
  "-6000:不正値の例",
  "0:開始",
  "214:表絵解除",
  "424:ゲーム開始",
  "TamaChan:不正値の例",
  ":不正値の例",
  " :不正値の例",
  "24*34:不正値の例",
  "1220:こういう:かきかたも:できる",
  "2024:ボス戦",
  "6000.3:不正値の例",
  "8247:ゲームオーバー",
  "86400:不正値の例",
  "20240619:不正値の例"
]
TSWorker(RawExample)
/*
Transformer()に整形済みデータを直で渡すなら下記のようにする
const Input = [
  {time:156,Description:"開始"},
  {time:285,Description:"顔面出しても良い"},
  {time:400,Description:"シェリーを演じてから周りに青が増えた"},
  {time:550,Description:"見た目売りしてる？"},{time:680,Description:"いつも落ち着き無いゆかし"},{time:795,Description:"バズが終わったらべつのがバズる"},{time:974,Description:"おねダリ900万記念"},{time:1025,Description:"おもろい話"},{time:1154,Description:"味の素と出汁の素を間違えた話"},{time:1610,Description:"もっと人気になる！"},{time:1720,Description:"「いってみろぉ」"},{time:1820,Description:"スト鯖に招待してもらってる"},{time:1925,Description:"黙ってたらお清楚"},{time:2090,Description:"サージシティの話"},{time:2285,Description:"優花「腹太鼓しても見てくれるはず」"},{time:2340,Description:"のみものとタンブラ―紹介"},{time:2460,Description:"私声優なんだって！(芸人だと思われてた)"},{time:2632,Description:"日本語ムズイ"},{time:2710,Description:"700人に訴えかける優花"},{time:2850,Description:"キーボードを貰った(シェリーカラーwithモザイク)"},{time:2990,Description:"キーボードおねだりしちゃった → さらにマウス・マウスパッドも"},{time:3210,Description:"ゆかしを知ったキッカケ"},{time:3420,Description:"SURGEから来た人の印象について"},{time:3680,Description:"女の子が増えた"},{time:3870,Description:"ライブTシャツ青色！(モザイクの逆襲？)"},{time:4070,Description:"ライブTシャツそんな作れて無くて..."},{time:4390,Description:"リアルな話"},{time:4464,Description:"本気はいつでも出さないと → みんなは居てくれるだけで推してる"},{time:4655,Description:"同接755人！"},{time:4695,Description:"㊗️お知らせパート！"},{time:4985,Description:"㊗️お知らせ2つめ！"},{time:5360,Description:"イベントについて訊きたいこと！"},{time:5552,Description:"髪型について"},{time:5770,Description:"支援の使い道とか"},{time:5980,Description:"声優から配信にシフトするの？"},{time:6220,Description:"今日はすごく有意義だった"},{time:6427,Description:"深夜のお食事デート"},{time:6570,Description:"今日の振り返り！"},{time:6725,Description:"ライブの振り返りでもお知らせがある"}];
Transformer(Input)
*/
