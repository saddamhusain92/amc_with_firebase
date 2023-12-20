 exports.amcspnid = ()=>{
    var min = "100000"
    var max = "999999"
    var res = "AMC"+Math.floor(Math.random()*(max-min+1))
    return res
}