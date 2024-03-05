export default function ModalShow({
  handleView,
  handleApi,
  handleClose,
  title,
  title1,
  title2,
  cancelBtn,
  customComponent,
  size,
  className,
  styleClass,
}: any) {

  const modalSize = size === 'sm' ? 'max-w-lg' : size === 'lg' ? 'max-w-6xl' : 'max-w-2xl';

  return (
    <div className={`${handleView ? 'fixed' : 'hidden'} inset-0 z-40 overflow-y-auto `}>
      <div className="flex items-center justify-center min-h-screen ">
        <div className={`bg-white rounded-lg shadow-lg ${modalSize} ${className} w-screen `}>
          <div className="flex justify-between items-center p-4 border-b">
            <h5 className="text-lg font-medium leading-none">{title}</h5>
            <button onClick={handleClose} className="text-gray-700">
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          <div className="p-4">
            {title1}
          </div>
          <div className="flex justify-end p-4 border-t">
            {title2 && (
              <button onClick={handleApi} className={`px-4 py-2 mr-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none ${styleClass ? styleClass : 'bg-blue-600 hover:bg-blue-700'}`}>
                {title2}
              </button>
            )}
            {customComponent}
            {cancelBtn && (
              <button onClick={handleClose} className={`px-4 py-2 text-sm font-medium leading-5 text-center text-blue-600 transition-colors duration-150 border border-blue-600 rounded-lg focus:outline-none hover:bg-blue-50`}>
                {cancelBtn}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
