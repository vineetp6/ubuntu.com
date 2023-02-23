import React from "react";
import { add, format } from "date-fns";
import { Field, useFormikContext } from "formik";
import { Col, RadioInput, Row } from "@canonical/react-components";
import { currencyFormatter } from "advantage/react/utils";
import { FormValues } from "../../utils/types";

type Props = {
  product: Product;
  quantity: number;
  action: Action;
  isTaxSaved: boolean;
};

const DATE_FORMAT = "dd MMMM yyyy";

const FreeTrial = ({ quantity, product, action, isTaxSaved }: Props) => {
  const { values } = useFormikContext<FormValues>();
  const { data: calculate, isFetching: isCalculateFetching } = useCalculate({
    quantity: quantity,
    marketplace: product.marketplace,
    productListingId: product.longId,
    country: values.country,
    VATNumber: values.VATNumber,
    isTaxSaved: isTaxSaved,
  });

  const { data: preview, isFetching: isPreviewFetching } = usePreview({
    quantity,
    product,
    action,
  });

  const isSummaryLoading = isPreviewFetching || isCalculateFetching;
  const priceData: TaxInfo | undefined = preview || calculate;

  return (
    <Row>
      <Col size={12}>
        <Field
          as={RadioInput}
          type="radio"
          id="useFreeTrial"
          name="FreeTrial"
          label="Use free trial month"
          value="useFreeTrial"
        />
        <Field
          as={RadioInput}
          type="radio"
          id="payNow"
          name="FreeTrial"
          label="Pay now"
          value="payNow"
        />
        {values?.FreeTrial === "useFreeTrial" ? (
          <>
            <p>
              <strong>Your free trial ends: </strong>
              {format(
                add(new Date(), {
                  months: 1,
                }),
                DATE_FORMAT
              )}{" "}
              after which time you will be charged
              {taxData?.total
                ? ` ${currencyFormatter.format(Number(taxData?.total) / 100)}`
                : ""}
              .
            </p>
            <p>
              You can cancel your subscription before your free trial ends in
              your Ubuntu Pro Dashboard
            </p>
          </>
        ) : null}
      </Col>
    </Row>
  );
};

export default FreeTrial;
