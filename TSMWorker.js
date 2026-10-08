//v2.1.4
//2.0.0_HTMLと連携する前提に変更。
//2.1.3_console出力をdebugレベルにし、CookedArrayをlet宣言ではなくconst宣言にした
//2.1.4_Transformerのconsoleがlogのママだったので修正
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
  document.getElementById("OutputText").value = Transformer(Cooker(ToTransform))
}
document.getElementById("Do").addEventListener("click", WorkerLoader)
