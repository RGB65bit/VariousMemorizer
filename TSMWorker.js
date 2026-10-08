//v2.2.0
//2.0.0_HTMLと連携する前提に変更。
//2.1.3_console出力をdebugレベルにし、CookedArrayをlet宣言ではなくconst宣言にした
//2.1.4_Transformerのconsoleがlogのまま未変更だったので修正
//2.1.5_BubbleSorterを定義した
//2.1.6_BubbleSorterが完全にデッドコードだったので修正
//2.1.7_BubbleSorterの中で未定義の配列を参照していた問題を修正
//2.1.8_そもそもreturnがないとかいう問題を修正
//2.2.0_動いたので正式実装
const ErrorLine = []
function Cooker(Ingredient){
  const CookedArray = []
  const RawLength = Ingredient.length
  for(let x = 0; x < RawLength; x++){
    const Line = Ingredient[x]
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
  console.debug(CookedArray)
  return CookedArray
}
function BubbleSorter(Cooked){
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
function WorkerLoader(){
  const ToTransformRaw = document.getElementById("InputText").value
  const ToTransform = ToTransformRaw.split(/\r?\n/)
  document.getElementById("OutputText").value = Transformer(BubbleSorter(Cooker(ToTransform)))
}
document.getElementById("Do").addEventListener("click", WorkerLoader)
