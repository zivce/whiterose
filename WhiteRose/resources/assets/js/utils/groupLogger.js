export default function(messagesToLog = ["hello!"], whereAreYou = "Main")
{

    console.group(`emitted from ${whereAreYou}`);
        messagesToLog.forEach((msg)=>{
            console.log(`${msg}`);
        })        
    
    console.groupEnd();
} 