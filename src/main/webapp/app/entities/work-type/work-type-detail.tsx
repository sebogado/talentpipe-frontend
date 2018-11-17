import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './work-type.reducer';
import { IWorkType } from 'app/shared/model/work-type.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWorkTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class WorkTypeDetail extends React.Component<IWorkTypeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { workTypeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="talentPipeFrontendApp.workType.detail.title">WorkType</Translate> [<b>{workTypeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="talentPipeFrontendApp.workType.name">Name</Translate>
              </span>
            </dt>
            <dd>{workTypeEntity.name}</dd>
            <dt>
              <span id="normalizedName">
                <Translate contentKey="talentPipeFrontendApp.workType.normalizedName">Normalized Name</Translate>
              </span>
            </dt>
            <dd>{workTypeEntity.normalizedName}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="talentPipeFrontendApp.workType.description">Description</Translate>
              </span>
            </dt>
            <dd>{workTypeEntity.description}</dd>
            <dt>
              <span id="minQuantityHours">
                <Translate contentKey="talentPipeFrontendApp.workType.minQuantityHours">Min Quantity Hours</Translate>
              </span>
            </dt>
            <dd>{workTypeEntity.minQuantityHours}</dd>
            <dt>
              <span id="maxQuantityHours">
                <Translate contentKey="talentPipeFrontendApp.workType.maxQuantityHours">Max Quantity Hours</Translate>
              </span>
            </dt>
            <dd>{workTypeEntity.maxQuantityHours}</dd>
          </dl>
          <Button tag={Link} to="/entity/work-type" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/work-type/${workTypeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ workType }: IRootState) => ({
  workTypeEntity: workType.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkTypeDetail);
