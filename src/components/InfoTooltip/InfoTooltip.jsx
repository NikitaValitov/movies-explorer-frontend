import './InfoTooltip.css'
function InfoTooltip({
  infotooltip
}) {

  return (

    <div className='infotooltip'>
      <div className="infotooltip__container ">
        <p className="infotooltip__text">{infotooltip}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;