import * as React from "react";

interface HTMLContentProps {
  renderHTMLContent: () => JSX.Element;
  open: Boolean;
}

const ModalComponent = ({
  renderHTMLContent,
  open,
}: HTMLContentProps) => {
  return (

    <div>
      {open && <>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"></div>
        {renderHTMLContent()}
      </>}
    </div>
  );
};

export default ModalComponent;
