import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CompanyDetail extends React.Component<ICompanyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { companyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentPipeFrontendApp.company.detail.title">Company</Translate> [<b>{companyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="taxName">
                <Translate contentKey="talentPipeFrontendApp.company.taxName">Tax Name</Translate>
              </span>
            </dt>
            <dd>{companyEntity.taxName}</dd>
            <dt>
              <span id="taxId">
                <Translate contentKey="talentPipeFrontendApp.company.taxId">Tax Id</Translate>
              </span>
            </dt>
            <dd>{companyEntity.taxId}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="talentPipeFrontendApp.company.email">Email</Translate>
              </span>
            </dt>
            <dd>{companyEntity.email}</dd>
            <dt>
              <span id="name">
                <Translate contentKey="talentPipeFrontendApp.company.name">Name</Translate>
              </span>
            </dt>
            <dd>{companyEntity.name}</dd>
            <dt>
              <span id="street">
                <Translate contentKey="talentPipeFrontendApp.company.street">Street</Translate>
              </span>
            </dt>
            <dd>{companyEntity.street}</dd>
            <dt>
              <span id="floor">
                <Translate contentKey="talentPipeFrontendApp.company.floor">Floor</Translate>
              </span>
            </dt>
            <dd>{companyEntity.floor}</dd>
            <dt>
              <span id="number">
                <Translate contentKey="talentPipeFrontendApp.company.number">Number</Translate>
              </span>
            </dt>
            <dd>{companyEntity.number}</dd>
            <dt>
              <span id="apartment">
                <Translate contentKey="talentPipeFrontendApp.company.apartment">Apartment</Translate>
              </span>
            </dt>
            <dd>{companyEntity.apartment}</dd>
            <dt>
              <span id="postalCode">
                <Translate contentKey="talentPipeFrontendApp.company.postalCode">Postal Code</Translate>
              </span>
            </dt>
            <dd>{companyEntity.postalCode}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="talentPipeFrontendApp.company.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{companyEntity.phone}</dd>
            <dt>
              <span id="contactName">
                <Translate contentKey="talentPipeFrontendApp.company.contactName">Contact Name</Translate>
              </span>
            </dt>
            <dd>{companyEntity.contactName}</dd>
            <dt>
              <Translate contentKey="talentPipeFrontendApp.company.mainUser">Main User</Translate>
            </dt>
            <dd>{companyEntity.mainUser ? companyEntity.mainUser.login : ''}</dd>
            <dt>
              <Translate contentKey="talentPipeFrontendApp.company.sector">Sector</Translate>
            </dt>
            <dd>{companyEntity.sector ? companyEntity.sector.name : ''}</dd>
            <dt>
              <Translate contentKey="talentPipeFrontendApp.company.city">City</Translate>
            </dt>
            <dd>{companyEntity.city ? companyEntity.city.name : ''}</dd>
            <dt>
              <Translate contentKey="talentPipeFrontendApp.company.companyType">Company Type</Translate>
            </dt>
            <dd>{companyEntity.companyType ? companyEntity.companyType.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/company" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/company/${companyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyDetail);
