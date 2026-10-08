//v2.4.0
//2.0.0_HTMLと連携する前提に変更。
//2.1.3_console出力をdebugレベルにし、CookedArrayをlet宣言ではなくconst宣言にした
//2.1.4_Transformerのconsoleがlogのまま未変更だったので修正
//2.1.5_BubbleSorterを定義した
//2.1.6_BubbleSorterが完全にデッドコードだったので修正
//2.1.7_BubbleSorterの中で未定義の配列を参照していた問題を修正
//2.1.8_そもそもreturnがないとかいう問題を修正
//2.2.0_正式実装
//2.2.1_エラーメッセージのテストを実装
//2.2.2_それのバグを一旦修正
//2.2.3_変なタイプミスと、判定式の書き順を変更。空をスプリットしても空なんだよｵｫｫｫｵｫｫｫ。
//2.2.4_メッセージの種類を追加
//2.2.5_安定動作した
//2.2.6_コロンのみが打ち込まれているときのエラー文を設定
//2.2.7_ エラーがない場合はその旨を表示
//2.3.0_一旦安定動作を確認
//2.3.1_内容がスペースのみだった場合にエラー判定がされない問題を修正
//2.4.0_デバッグ表示を実装し、エラー表示を本実装。BubbleSorterのやっていることはバブルソートではないのでただのSorterに。(というかJS固有のsortでも良いんだけど、やっていることはこっちのほうがわかりやすい貴ガス)

let ErrorLine = []
function Cooker(Ingredient){
  ErrorLine = []
  const CookedArray = []
  const RawLength = Ingredient.length
  for(let x = 0; x < RawLength; x++){
    let ErrStat = false
    const Line = Ingredient[x]
    const LineSplited = Line.split(":")
    if(LineSplited.length >= 3){
      for(let y = 2; y < LineSplited.length; y++){
        LineSplited[1] = LineSplited[1] + ":" + LineSplited[y]
      }
    }
    if(Line === ""){
      const ErrObj = {Line:String(x + 1),Reason:"行は空行です。"}
      ErrorLine.push(ErrObj)
      ErrStat = true
    }
    else if(Line === ":"){
      const ErrObj = {Line:String(x + 1),Reason:"行にはコロンのみが打ち込まれており、時間も内容も含まれていません。"}
      ErrorLine.push(ErrObj)
      ErrStat = true
    }
    else if(LineSplited[1] === undefined){
      const ErrObj = {Line:String(x + 1),Reason:"行には内容が定義されていません。"}
      ErrorLine.push(ErrObj)
      ErrStat = true
    }
    else if(LineSplited[0].trim() === ""){
      const ErrObj = {Line:String(x + 1),Reason:"行には時間が含まれていません。"}
      ErrorLine.push(ErrObj)
      ErrStat = true
    }
    else if(isNaN(LineSplited[0]) === true){
      const ErrObj = {Line:String(x + 1),Reason:"数値ではない値が総経過秒数に指定されています。"}
      ErrorLine.push(ErrObj)
      ErrStat = true
    }
    else if(!Number.isInteger(Number(LineSplited[0]))){
      const ErrObj = {Line:String(x + 1),Reason:"総経過秒数に指定する数値は、整数である必要があります。"}
      ErrorLine.push(ErrObj)
      ErrStat = true
    }
    else if(Number(LineSplited[0]) > 43200){
      const ErrObj = {Line:String(x + 1),Reason:"総経過秒数に指定する数値は、43200秒以下である必要があります。"}
      ErrorLine.push(ErrObj)
      ErrStat = true
    }
    else if(Number(LineSplited[0]) < 0 ){
      const ErrObj = {Line:String(x + 1),Reason:"総経過秒数に指定する数値は、0以上である必要があります。"}
      ErrorLine.push(ErrObj)
      ErrStat = true
    }
    else if(LineSplited[1].trim() === ""){
      const ErrObj = {Line:String(x + 1),Reason:"行には内容が含まれていません。"}
      ErrorLine.push(ErrObj)
      ErrStat = true
    }
    if(ErrStat === true){
      continue
    }
    const LineTime = LineSplited[0]
    const LineDescription = LineSplited[1]
    const Obj = {time:LineTime, Description:LineDescription}
    CookedArray.push(Obj)
  }
  console.debug(CookedArray)
  console.debug(ErrorLine)
  return CookedArray
}
function Sorter(Cooked){
  const CookedArrayLength = Cooked.length
  for(let x = 0; x < CookedArrayLength - 1; x++){
    for(let y = x + 1; y < CookedArrayLength; y++){
      if(Number(Cooked[x].time) > Number(Cooked[y].time)){
        const temp = Cooked[x]
        Cooked[x] = Cooked[y]
        Cooked[y] = temp
      }
    }
  }
  return Cooked
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
  console.debug(OutputText)
  return OutputText
}
function TSErrRender(){
  let ErrArrTransformed = "\n/*エラー情報*/\n"
  if(ErrorLine.length === 0){
    ErrArrTransformed = ErrArrTransformed + "エラーはありません"
  }
  else{
    for(let x = 0; x < ErrorLine.length; x++){
      ErrArrTransformed = ErrArrTransformed + `Error at Line ${ErrorLine[x].Line}:${ErrorLine[x].Reason}\n`
    }
  }
  console.debug(ErrArrTransformed)
  return ErrArrTransformed
}
function WorkerLoader(){
  const ST = performance.now()
  const ToTransformRaw = document.getElementById("InputText").value
  const ToTransform = ToTransformRaw.split(/\r?\n/)
  console.debug(ToTransform)
  const Transformed =  Transformer(Sorter(Cooker(ToTransform)))
  const ErrTransformed = TSErrRender()
  const OutputText = Transformed + ErrTransformed
  document.getElementById("OutputText").value = OutputText
  const ED = performance.now()
  const PerformDiff = ED - ST
  console.debug(`処理実行時間:${PerformDiff.toFixed(3)}ms`)
}
document.getElementById("Do").addEventListener("click", WorkerLoader)
