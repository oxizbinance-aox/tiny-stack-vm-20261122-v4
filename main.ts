({MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env)
F=require('fs')
R=F.readFileSync
W=F.writeFileSync
H=n=>{throw n}
E='a+b|0;a-b|0;Math.imul(a,b);a/b|0;a%b|0;(a>>>0)/(b>>>0)|0;(a>>>0)%(b>>>0)|0;-b|0;a&b;a|b;a^b;~b;a<<b;a>>b;a>>>b|0;;+(a==b);+(a<b);+((a>>>0)<(b>>>0))'.split(';')
T=E.map(e=>Function('a,b','return '+e))
V=0xF0003001F00077FFF00FFn
for(let d of F.readdirSync(I)){
let U='/'+d
let p=R(I+U+'/program.bin'),q=R(I+U+'/input.bin')
let s=[],c=[],m=[],o='',j=0,k=0,e=0,t=0,u=n=>s.length<n&&H(2),w=v=>s.length>255?H(3):s.push(v),P=()=>s.pop()
try{for(;t++<1e6;){
if(p[j]==null)H(9)
let x=p[j]
if(V>>BigInt(x)&1n^1n)H(5)
if(x<8){
if(!x)H(0)
if(x<3){
if(j+x*3-2>=p.length)H(9)
w(x<2?p[j+1]<<24>>24:p.readInt32LE(j+1))
j+=x*3-1
}else{
u(x-1>>1)
if(x==3)P()
else if(x%2==0){w(s.at(-1-(x>5)))}
else s.push(s.splice(-1-(x-3)/2,1)[0])
j++
}}else if(x<35){
let y=x-16,n=x==23||x==27?1:2
u(n)
let b=P(),a=n>1&&P()
if(x>18&&x<23&&!b)H(4)
s.push(T[y](a,b))
j++
}else if(x<53){
if(x<52&&j+2>=p.length)H(9)
let y=p[j+1]|p[j+2]<<8,z=y<<16>>16
if(x==48)j+=3+z
else if(x<51){u(1);j+=3+z*((x==49)==!P())}
else if(x==51){if(c[63])H(7);c.push(j+3);j=y}
else{j=c.pop();if(j==null)H(8)}
}else if(x<66){
u(2-(x==64))
let a=P()
if(a>>>0>255)H(6)
if(x==64)s.push(m[a]|0);else m[a]=P()
j++
}else{
if(x<82){
u(1)
let v=P(),y=x==80?''+v:String.fromCharCode(v&255)
if(o.length+y.length>65536)H(11)
o+=y;j++
}else if(x<83){
w(q[k++]??-1);j++
}else{
u(1)
H(P()&255)
}}
}H(10)}catch(g){e=g}
F.mkdirSync(O+U,{recursive:true})
W(O+U+'/stdout.bin',o,'latin1')
W(O+U+'/exit.txt',e+'')
}
