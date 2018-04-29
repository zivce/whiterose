export default function(messagesToLog = ["hello!"], whereAreYou)
{

    console.group(`emitted from ${whereAreYou}`);
        messagesToLog.forEach((msg)=>{
            console.log(`${msg}`);
        })        
    
    console.groupEnd();
} 