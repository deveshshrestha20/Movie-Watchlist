const Card = ({ title, image }) => {
    return (
      <div className='w-56 h-72 m-3  rounded-lg shadow-md bg-gray-800 hover:shadow-xl transform hover:scale-110 transition-transform duration-300'>
        <div className='h-72 overflow-hidden rounded-t-lg '>
          <img className='w-full h-full object-cover' src={image} alt={title} />
        </div>
        <p className='text-white mt-2 text-center font-semibold text-sm truncate px-2'>
          {title}
        </p>
      </div>
    );
  };
  
  export default Card;
  