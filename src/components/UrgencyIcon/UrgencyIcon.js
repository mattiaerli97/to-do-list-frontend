import './UrgencyIcon.css'

const UrgencyIcon = ({ urgency }) => {
    switch (urgency) {
      case 1:
        return <span className="mdi mdi-chevron-up"></span>
      case 2:
        return <span className="mdi mdi-chevron-double-up"></span>
      case 3:
        return <span className="mdi mdi-chevron-triple-up"></span>
    }
}

export default UrgencyIcon
