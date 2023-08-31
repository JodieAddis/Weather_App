export const getDate = () => {
    const months = [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sep.",
        "Oct.",
        "Nov.",
        "Dec.",
    ];
    const today = new Date();
    const monthIndex = today.getMonth();
    const month = months[monthIndex];
    const date = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    return (
        <>
            <p>
                {date} {month} - {hours}h{minutes}
            </p>
        </>
    );
};
