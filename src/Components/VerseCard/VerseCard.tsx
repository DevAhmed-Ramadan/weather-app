import useVerse from '../../Hooks/useVerse'

export default function VerseCard() {

    const {data} = useVerse();

    const TodaysVerse = data?.text;    
    

    return (
        <div className='flex flex-col w-full bg-white text-[#1E1E1E] h-full rounded-[1rem] px-3 shadow-xl dark:text-white dark:bg-slate-800'>
            <h2 className="text-3xl font-bold mt-3 ms-2">Today's verse</h2>
            <div className='flex-grow flex justify-center items-center'>
                <p className='text-center text-[37px]'>
                    {TodaysVerse}
                </p>
            </div>
        </div>
    )
}