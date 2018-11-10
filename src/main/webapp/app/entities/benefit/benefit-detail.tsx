import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './benefit.reducer';
import { IBenefit } from 'app/shared/model/benefit.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBenefitDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BenefitDetail extends React.Component<IBenefitDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { benefitEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentpipeApp.benefit.detail.title">Benefit</Translate> [<b>{benefitEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentpipeApp.benefit.name">Name</Translate>
              </span>
            </dt>
            <dd>{benefitEntity.name}</dd>
            <dt>
              <span id="normalizedName">
                <Translate contentKey="talentpipeApp.benefit.normalizedName">Normalized Name</Translate>
              </span>
            </dt>
            <dd>{benefitEntity.normalizedName}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="talentpipeApp.benefit.description">Description</Translate>
              </span>
            </dt>
            <dd>{benefitEntity.description}</dd>
          </dl>
          <Button tag={Link} to="/entity/benefit" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/benefit/${benefitEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ benefit }: IRootState) => ({
  benefitEntity: benefit.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenefitDetail);
