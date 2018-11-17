import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company-type.reducer';
import { ICompanyType } from 'app/shared/model/company-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CompanyTypeDetail extends React.Component<ICompanyTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { companyTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentPipeFrontendApp.companyType.detail.title">CompanyType</Translate> [<b>{companyTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentPipeFrontendApp.companyType.name">Name</Translate>
              </span>
            </dt>
            <dd>{companyTypeEntity.name}</dd>
            <dt>
              <span id="normalizedName">
                <Translate contentKey="talentPipeFrontendApp.companyType.normalizedName">Normalized Name</Translate>
              </span>
            </dt>
            <dd>{companyTypeEntity.normalizedName}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="talentPipeFrontendApp.companyType.description">Description</Translate>
              </span>
            </dt>
            <dd>{companyTypeEntity.description}</dd>
            <dt>
              <span id="minEmployeesQuantity">
                <Translate contentKey="talentPipeFrontendApp.companyType.minEmployeesQuantity">Min Employees Quantity</Translate>
              </span>
            </dt>
            <dd>{companyTypeEntity.minEmployeesQuantity}</dd>
            <dt>
              <span id="maxEmployeesQuantity">
                <Translate contentKey="talentPipeFrontendApp.companyType.maxEmployeesQuantity">Max Employees Quantity</Translate>
              </span>
            </dt>
            <dd>{companyTypeEntity.maxEmployeesQuantity}</dd>
          </dl>
          <Button tag={Link} to="/entity/company-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/company-type/${companyTypeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ companyType }: IRootState) => ({
  companyTypeEntity: companyType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyTypeDetail);
