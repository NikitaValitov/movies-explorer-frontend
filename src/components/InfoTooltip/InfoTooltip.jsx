import './InfoTooltip.css'
function InfoTooltip({
  text
}) {

  return (

    <div className='infotooltip'>
      <div className="infotooltip__container ">
        <p className="infotooltip__text">{text}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;