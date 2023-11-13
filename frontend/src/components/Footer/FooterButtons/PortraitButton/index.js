import './PortraitButton.css'
function PortraitButton({icon,link}){
    return(
        <a
            className="portrait-button"
            href={link}
            target="_blank" 
            rel="noopener noreferrer"
        >
            {icon}
        </a>
    )
}
export default PortraitButton;