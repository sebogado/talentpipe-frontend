import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './recruiter.reducer';
import { IRecruiter } from 'app/shared/model/recruiter.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecruiterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RecruiterDetail extends React.Component<IRecruiterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { recruiterEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentPipeFrontendApp.recruiter.detail.title">Recruiter</Translate> [<b>{recruiterEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentPipeFrontendApp.recruiter.name">Name</Translate>
              </span>
            </dt>
            <dd>{recruiterEntity.name}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="talentPipeFrontendApp.recruiter.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{recruiterEntity.lastName}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="talentPipeFrontendApp.recruiter.email">Email</Translate>
              </span>
            </dt>
            <dd>{recruiterEntity.email}</dd>
            <dt>
              <span id="taxId">
                <Translate contentKey="talentPipeFrontendApp.recruiter.taxId">Tax Id</Translate>
              </span>
            </dt>
            <dd>{recruiterEntity.taxId}</dd>
            <dt>
              <span id="phone">
                <Translate contentKey="talentPipeFrontendApp.recruiter.phone">Phone</Translate>
              </span>
            </dt>
            <dd>{recruiterEntity.phone}</dd>
            <dt>
              <span id="street">
                <Translate contentKey="talentPipeFrontendApp.recruiter.street">Street</Translate>
              </span>
            </dt>
            <dd>{recruiterEntity.street}</dd>
            <dt>
              <span id="number">
                <Translate contentKey="talentPipeFrontendApp.recruiter.number">Number</Translate>
              </span>
            </dt>
            <dd>{recruiterEntity.number}</dd>
            <dt>
              <span id="floor">
                <Translate contentKey="talentPipeFrontendApp.recruiter.floor">Floor</Translate>
              </span>
            </dt>
            <dd>{recruiterEntity.floor}</dd>
            <dt>
              <span id="apartment">
                <Translate contentKey="talentPipeFrontendApp.recruiter.apartment">Apartment</Translate>
              </span>
            </dt>
            <dd>{recruiterEntity.apartment}</dd>
            <dt>
              <Translate contentKey="talentPipeFrontendApp.recruiter.city">City</Translate>
            </dt>
            <dd>{recruiterEntity.city ? recruiterEntity.city.name : ''}</dd>
            <dt>
              <Translate contentKey="talentPipeFrontendApp.recruiter.sector">Sector</Translate>
            </dt>
            <dd>{recruiterEntity.sector ? recruiterEntity.sector.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/recruiter" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/recruiter/${recruiterEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ recruiter }: IRootState) => ({
  recruiterEntity: recruiter.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecruiterDetail);
